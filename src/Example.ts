import Block, { BlockPermutation } from './MC_API/Block.js';
import BlockRegistry from './Registries/BlockRegistry.js';

let newPermutation = new BlockPermutation().lightAbsorption(1).breakOnPush(true);

let defaultPerm = new BlockPermutation()
  .lightEmission(1)
  .onlyPistonPush(true)
  .preventsJumping(true)
  .randomTicking('abc', 'self')
  .ticking([1, 3], true, 'def')
  .unitCube()
  .unwalkable(true)
  .friction(1.0)
  .materialInstances({
    '*': {
      texture: 'dirt',
      render_method: 'opaque',
    },
    south: {
      texture: 'stone',
      render_method: 'alpha_test',
    },
  })
  .mapColor('95eb34')
  .entityCollision(false);

let newBlock = new Block()
  .registerProperty('example:property', [0, 1, 2, 3, 4])
  .registerPermutation(newPermutation, 'example:property', 4);

newBlock.init = defaultPerm;

BlockRegistry.register('example:block', 'Nature', newBlock);


BlockRegistry.register('example:empty_block', 'None', new Block())