import Block, { BlockPermutation } from './MC_API/Block.js';
import BlockRegistry from './Registries/BlockRegistry.js';

let newPermutation = new BlockPermutation().lightAbsorption(1).breakOnPush(true);

let defaultPerm = new BlockPermutation().lightAbsorption(15).lightEmission(1);

let newBlock = new Block('Nature')
  .registerProperty('example:property', [0, 1, 2, 3, 4])
  .registerPermutation(newPermutation, 'example:property', 4);

newBlock.init = defaultPerm;

BlockRegistry.register('example:block', newBlock);

console.log(BlockRegistry.Blocks);
