import { diary } from 'diary';
import type { LogEvent } from 'diary';

import type { Tracker, Reporter } from 'workers-logger';

export { sprintf as format, compare } from 'diary/utils';
export { enable } from 'diary';

export const track = (req: Request, name?: string, reporter?: Reporter) => {
	const queue: LogEvent[] = [];
  let metaData: Record<string, unknown> = {};
  const childLoggers: Record<string, Tracker> = {};

	const $ = diary(name || '', (event) => void queue.push(event)) as Tracker;

	$.report = (res) => {
		if (typeof reporter === 'function') {
			return reporter(queue, { req, res, meta: metaData });
		}
	};

  $.meta = (key, value) => {
    metaData[key] = value;
  }

  $.metaObj = (obj: Record<string, unknown>) => {
    metaData = { ...metaData, ...obj };
  }

  $.getMeta = () => {
    return metaData;
  }

  $.child = (name) => {
    if (!childLoggers[name]) {
      childLoggers[name] = track(req, name, reporter);
      childLoggers[name].metaObj(metaData);
    }
    return childLoggers[name];
  }

  $.children = () => {
    return Object.values(childLoggers);
  }

	return $;
};
