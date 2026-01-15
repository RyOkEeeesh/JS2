import clsx from 'clsx';
import { useCallback, useRef, useState } from 'react';

const VERTICAL_BAR = '│';
const BRANCH_BAR = '├';
const FIN_BRANCH_BAR = '└';
const HORIZONTAL_BAR = '─';

type DropAreaProps = {
  setFiles: React.Dispatch<React.SetStateAction<any[]>>;
}

const useFolderDrop = (onFilesLoaded, onError) => {
  const traverseEntry = useCallback(async (entry) => {
    const files = [];
    
    const internalSearch = async (item) => {
      if (item.isFile) {
        const file = await new Promise(resolve => {
          item.file(f => {
            // 元のロジック同様、相対パスを保持
            Object.defineProperty(f, "webkitRelativePath", {
              value: item.fullPath.slice(1),
            });
            resolve(f);
          });
        });
        files.push(file);
      } else if (item.isDirectory) {
        const reader = item.createReader();
        const readAll = async () => {
          const entries = await new Promise(resolve => reader.readEntries(resolve));
          if (entries.length > 0) {
            for (const entry of entries) await internalSearch(entry);
            await readAll();
          }
        };
        await readAll();
      }
    };

    await internalSearch(entry);
    return files;
  }, []);

  const handleDrop = useCallback(async (event) => {
    event.preventDefault();
    const items = Array.from(event.dataTransfer.items);
    const entries = items.map(item => item.webkitGetAsEntry());

    const files = entries.filter(e => e?.isFile);
    const directories = entries.filter(e => e?.isDirectory);

    if (directories.length === 1 && files.length === 0) {
      const allFiles = await traverseEntry(directories[0]);
      onFilesLoaded(allFiles);
    } else {
      onError('投稿ファイルの入ったフォルダを1つドラッグアンドドロップしてください');
    }
  }, [traverseEntry, onFilesLoaded, onError]);

  return { handleDrop };
};

function DropArea({setFiles}: DropAreaProps) {
  const [isDrag, setIsDrag] = useState<boolean>(false);
  const { handleDrop } = useFolderDrop(
    (files) => {
      setFiles(files);
      console.log("読み込んだファイル:", files);
    },
    (error) => alert(error)
  );
  return (
    <div
      className={clsx("w-[50vw] h-screen border", isDrag ? 'drag' : 'leave')}
      onDragEnter={e => {
        e.preventDefault();
        setIsDrag(true);
      }}
      onDragLeave={e => {
        e.preventDefault();
        setIsDrag(false);
      }}
      onDragOver={e => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
      }}
      onDrop={handleDrop}
    >
    </div>
  )
}

export default function App() {
  const [files, setFiles] = useState<any[]>([]);
  return (
    <div className="h-screen w-screen flex">
      <DropArea setFiles={setFiles} />
      <div className="w-[50vw] h-screen">
        {files.length !== 0 && files.map((f, i) => (
          <li key={i}>{f.webkitRelativePath}</li>
        ))}
      </div>
    </div>
  )
}