import { Property, categories, Permutation, propertyValArr, clamp, propertyVal } from './Common.js';

export class BlockPermutation extends Permutation {
  /**
   * Sets the amount of light levels a block absorbs
   * @default lightLevel = 15 @param lightLevel An integer from 0-15
   */
  lightAbsorption(lightLevel: number = 15) {
    lightLevel = clamp(Math.round(lightLevel), 0, 15);
    this.newComponent('minecraft:block_light_absorption', lightLevel);
    return this;
  }

  /**
   * Sets the amount of light levels a block emits
   * @default lightDec = 0 @param lightDec A decimal from 0-1
   */
  lightEmission(lightDec: number = 0) {
    lightDec = clamp(lightDec, 0, 1);
    this.newComponent('minecraft:block_light_emission', lightDec);
    return this;
  }

  /**
   * Sets whether the block will break when pushed by a piston
   * @default bool = false @param bool A boolean
   */
  breakOnPush(bool: boolean = false) {
    this.newComponent('minecraft:breakonpush', bool);
    return this;
  }
  
  /**
   * Sets whether the block this block will be treated like air or a solid
   * @default value = solid @param value Enum consisting of 'air' and 'solid'
   */
   breathability(value: 'air' | 'solid' = 'solid') {
    this.newComponent('minecraft:breathability', value);
    return this;
  }
}

class Block {
  category: categories;
  properties = new Map<string, Property>();
  permutations = new Map<string, BlockPermutation>();
  init = new BlockPermutation();

  constructor(category: categories) {
    this.category = category;
  }

  /**
   * Registers a block property
   * @param identifier Property Identifier
   * @param value Property Value Enum/Object
   */
  registerProperty(identifier: string, value: propertyValArr) {
    if (this.properties.has(identifier)) throw `Block already has property "${identifier}"`;

    this.properties.set(identifier, new Property(identifier, value));
    return this;
  }

  registerPermutationRaw(permutation: BlockPermutation, condition: string) {
    this.permutations.set(condition, permutation);
    return this;
  }

  registerPermutation(permutation: BlockPermutation, propertyIdentifier: string, propertyValue: propertyVal) {
    let valueParsed: string;
    switch (typeof propertyValue) {
      case 'string':
        valueParsed = `'${propertyValue}'`;
        break;
      case 'boolean':
        valueParsed = `${propertyValue}`;
        break;
      case 'number':
        valueParsed = `${propertyValue}`;
        break;
    }
    const expression = `q.block_property('${propertyIdentifier}') == ${valueParsed}`;
    this.registerPermutationRaw(permutation, expression);
    return this;
  }
}

export default Block;
