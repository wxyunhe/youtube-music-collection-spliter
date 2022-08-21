import { exec } from "child_process";
import { readFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { execa } from "execa";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 用户主动输入信息
const SOURCE_PATH = path.join(__dirname, `source/《胡彦斌》精选串烧集，曾经最喜欢的实力歌手，再听一次回味无穷！.mp3`);
const TARGET_PATH = path.join(__dirname, `target`);
const MUSIC_LIST = (await readFile("./presets/sample.txt")).toString();
const extname = path.extname(SOURCE_PATH);

async function __init__() {
  const arr = MUSIC_LIST.split(/\n/)
    .filter((i) => i)
    .map((item) => getID(item));

  const tasks = genTask(arr);
  await Promise.all(tasks.map((task) => splitMusic(task)));
}

await __init__();

function genTask(IDs) {
  const tasks = IDs.reduce((_tasks, ID, i, _IDs) => {
    const nextID = i + 1 == _IDs.length ? null : _IDs[i + 1];
    const [title, start, end] = [
      ID.title,
      ID.offset,
      nextID ? nextID.offset : null,
    ];
    _tasks.push({ title, start, end });
    return _tasks;
  }, []);
  return tasks;
}

function splitMusic(task) {
  const { title, start, end } = task;

  const params = [
    ["-ss", start],
    ["-i", SOURCE_PATH],
    end && ["-t", end - start],
    ["-c", "copy", path.join(TARGET_PATH, `${title}${extname}`)],
  ].filter((p) => p);

  const args = params.flat();
  return execa(path.join(__dirname, "vendor/ffmpeg.exe"), args);
}

function getID(item) {
  const _item = item.trim();
  const delimiterPosition = getDelimiterPosition(_item);
  const [time, title] = [
    _item.substring(0, delimiterPosition),
    _item.substring(delimiterPosition + 1).trim(),
  ];
  const offset = getTimeOffset(time);
  return { offset, title };
}

function getDelimiterPosition(str) {
  const DELIMITER = " ";
  return str.indexOf(DELIMITER);
}

function getTimeOffset(time) {
  const [s = 0, m = 0, h = 0] = time
    .split(":")
    .map((i) => Number(i))
    .reverse();

  return s + m * 60 + h * 60 * 60;
}
