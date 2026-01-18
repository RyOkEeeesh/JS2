import { useEffect, useMemo, useRef, useState } from 'react';
import {
  intToIpv4,
  IP_MAX,
  ipv4ToInt,
  isIpv4,
  isMask,
  lenFromMask,
  maskFromLen,
  networkFromIpMask,
} from './ipUtils';
import { Input, Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon, SlashIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';

type IntIPv4 = number | null;

function useIpv4State() {
  const [ip, setI] = useState<IntIPv4>(null);
  const [mask, setM] = useState<IntIPv4>(null);
  function setIp(i: IntIPv4) { if (ip !== i) setI(i); }
  function setMask(m: IntIPv4) {
    if (mask !== m) setM(m !== null && isMask(m) ? m : null);
  }
  return { ip, mask, setIp, setMask };
}

type TextInputProps = {
  label: string;
  placeholder?: string;
  ip: IntIPv4;
  setIp: (v: IntIPv4) => void;
  children?: React.ReactNode;
  className?: string;
  id: string;
};

function TextInput({ label, placeholder, ip, setIp, children, className, id }: TextInputProps) {
  const [value, setValue] = useState('');
  const isInternalRef = useRef<boolean>(false);

  useEffect(() => {
    if (ip === null) {
      if (!isInternalRef.current) setValue('');
    } else {
      setValue(intToIpv4(ip));
    }
    isInternalRef.current = false;
  }, [ip]);

  return (
    <>
      <label className='block' htmlFor={id}>
        {label}
      </label>
      <div className='input-wrap'>
        <Input
          type='text'
          autoComplete='off'
          className={clsx(className, 'outline-none bg-transparent', ip !== null ? 'focus:shadow-[inset_0_-2px_0_0_#a3e635]' : 'focus:shadow-[inset_0_-2px_0_0_#ef4444]')}
          id={id}
          value={value}
          placeholder={placeholder}
          onChange={(e) => {
            const t = e.target.value;
            isInternalRef.current = true;
            setValue(t);
            setIp(isIpv4(t) ? ipv4ToInt(t) : null);
          }}
          maxLength={15}
        />
        {children}
      </div>
    </>
  );
}

type OptionType = { value: number; label: string; };

const RAW_OPTIONS: OptionType[] = Array.from({ length: IP_MAX + 1 }, (_, i) => ({
  value: i,
  label: `${i}`,
}));
const FULL_OPTIONS: OptionType[] = [{ value: -1, label: '' }, ...RAW_OPTIONS];

const options: OptionType[] = Array.from({ length: IP_MAX + 1 }, (_, i) => ({ value: i, label: `${i}` }));
options.unshift({ value: -1, label: '' });

function Leninput({ mask, setMask, id }: { mask: IntIPv4; setMask: (v: IntIPv4) => void; id: string }) {
  const [mounted, setMounted] = useState(false);
  const [query, setQuery] = useState<string>('');
  
  useEffect(() => { setMounted(true); }, []);

  const select = useMemo(() => {
    const len = lenFromMask(mask ?? -1) ?? -1;
    return FULL_OPTIONS.find(o => o.value === len) ?? FULL_OPTIONS[0];
  }, [mask]);

  useEffect(() => {
    setQuery(select.label);
  }, [select]);

  return (
    <>
      <Input
        id={`${id}-input`}
        type='text'
        autoComplete='off'
        className={clsx('input-len', 'outline-none bg-transparent', 
          mask !== null ? 'focus:shadow-[inset_0_-2px_0_0_#a3e635]' : 'focus:shadow-[inset_0_-2px_0_0_#ef4444]')}
        value={query}
        placeholder='24'
        onChange={(e) => {
          setQuery(e.target.value);
          const val = Number(e.target.value);
          setMask(e.target.value.length === 0 || isNaN(val) ? null : maskFromLen(val));
        }}
        maxLength={2}
      />
      {mounted && (
        <Listbox value={select} onChange={(op) => setMask(op.value === -1 ? null : maskFromLen(op.value))}>
          <ListboxButton>
            <ChevronDownIcon className='size-5' />
          </ListboxButton>
          <ListboxOptions className='options'>
            {FULL_OPTIONS.filter(op => op.value !== -1).map(op => (
              <ListboxOption key={op.value} value={op} className='group flex cursor-default items-center gap-2 rounded-lg px-3 py-1.5 select-none data-focus:bg-white/10'>
                <CheckIcon className='invisible size-4 group-data-selected:visible' />
                {op.label}
              </ListboxOption>
            ))}
          </ListboxOptions>
        </Listbox>
      )}
    </>
  );
}

function MutualInputBox({ ipHook, index }: { ipHook: ReturnType<typeof useIpv4State>; index: number }) {
  return (
    <div className='mutual-box'>
      <TextInput
        className='input-ip'
        label='IP Address'
        placeholder='192.168.0.1'
        ip={ipHook.ip}
        setIp={ipHook.setIp}
        id={`ip-input-${index}`}
      >
        <div className='h-full flex items-center gap-1 pr-1'>
          <SlashIcon className='size-5' />
          <Leninput mask={ipHook.mask} setMask={ipHook.setMask} id={`len-${index}`} />
        </div>
      </TextInput>
      <TextInput
        className='input-mask'
        label='Subnet Mask'
        ip={ipHook.mask}
        setIp={ipHook.setMask}
        placeholder='255.255.255.0'
        id={`mask-input-${index}`}
      />
    </div>
  );
}

function MutualCommunication() {
  const ipHooks = [useIpv4State(), useIpv4State()];

  const canCommunicate = useMemo(() => {
    if (ipHooks[0].ip === null || ipHooks[1].ip === null || ipHooks[0].mask === null || ipHooks[1].mask === null) return null;
    return (
      (ipHooks[0].ip & ipHooks[1].mask) === networkFromIpMask(ipHooks[1].ip!, ipHooks[1].mask!) &&
      (ipHooks[1].ip & ipHooks[0].mask) === networkFromIpMask(ipHooks[0].ip!, ipHooks[0].mask!)
    );
  }, [ipHooks[0].ip, ipHooks[1].ip, ipHooks[0].mask, ipHooks[1].mask]);

  return (
    <div className='flex h-full w-full flex-col items-center justify-center'>
      <div className='flex gap-4'>
        {ipHooks.map((ipHook, i) => (
          <div key={i}>
            <p className='text-center'>IP {i + 1}</p>
            <MutualInputBox ipHook={ipHook} index={i} />
          </div>
        ))}
      </div>
      <div className='h-4 mt-4'>
        {canCommunicate !== null && (
          <p className={clsx(canCommunicate ? 'text-lime-400' : 'text-red-400')}>
            {canCommunicate ? '通信可能' : '通信不可能'}
          </p>
        )}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div className='bg-bgclr text-txclr h-screen w-screen transition-colors duration-300'>
      <MutualCommunication />
    </div>
  );
}