import prettyBytes from 'pretty-bytes';

export function formatFileSize(size: number, withSpace: boolean = false): string {
  return prettyBytes(size, {
    spaces: withSpace ? 1 : 0,
    uppercaseKilo: true,
  });
}
