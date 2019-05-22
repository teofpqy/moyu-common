import { IBundleOptions } from 'umi-library/src/types';

const options: IBundleOptions = {
  cjs: 'babel',
  esm: 'rollup',
  doc: { typescript: true },
};

export default options;
