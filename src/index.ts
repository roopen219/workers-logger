import { diary } from 'diary';
import type { LogEvent } from 'diary';

import type { Tracker, Reporter } from 'workers-logger';

export { sprintf as format, compare } from 'diary/utils';
export { enable } from 'diary';

export const track = (req: Request, name?: string, reporter?: Reporter) => {
	const queue: LogEvent[] = [];
  const metaData: Record<string, unknown> = {};

	const $ = diary(name || '', (event) => void queue.push(event)) as Tracker;

	$.report = (res) => {
		if (typeof reporter === 'function') {
			return reporter(queue, { req, res, meta: metaData });
		}
	};

  $.meta = (key, value) => {
    metaData[key] = value;
  }

	return $;
};
