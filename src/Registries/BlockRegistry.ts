import Block from '../MC_API/Block.js';
import { config, Registry } from '../MC_API/Common.js';

export default class BlockRegistry extends Registry {
  static Blocks = new Map<string, Block>();

  static register(identifier: string, block: Block) {
    if (BlockRegistry.Blocks.has(identifier)) throw `Block already exists with identifier "${identifier}"`;

    this.Blocks.set(identifier, block);

    if (!config.outputPath) throw `Unable to compile JSON file, no output path specified in config`;
    const FILENAME = identifier.split(':')[1];
    let data: any = {
      format_version: '1.16.100',
      'minecraft:block': {
        description: {
          identifier: '',
          category: '',
          properties: {},
        },
        components: {},
        permutations: [],
        events: {},
      },
    };
    data['minecraft:block'].description.category = block.category;

    this.registerCommon(data, 'minecraft:block', block, { identifier: identifier });

    this.createFile('blocks', FILENAME, data);
  }
}
