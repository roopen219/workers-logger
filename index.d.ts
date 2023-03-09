import type { Diary, LogEvent } from 'diary';

export type { LogEvent, LogLevels } from 'diary';

export { sprintf as format, compare } from 'diary/utils';
export { enable } from 'diary';

export type Reporter = (
	events: LogEvent[],
	context: { req: Request; res: Response, meta: Record<string, unknown> },
) => Promise<any> | void;

export interface Tracker extends Diary {
	report(response: Response): Promise<any> | void | undefined;
  meta(key: string, value: unknown): void;
}

export const track: (
	req: Request,
	name?: string,
	reporter?: Reporter,
) => Tracker;
