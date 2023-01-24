import prettyBytes from 'pretty-bytes';

const prettyBytesOptions = {
  spaces: 0,
  uppercaseKilo: true,
};

export function formatFileSize(size: number): string {
  return prettyBytes(size, prettyBytesOptions);
}
