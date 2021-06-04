import {
  Property,
  categories,
  Permutation,
  propertyValArr,
  clamp,
  propertyVal,
  blockDescriptor,
  eventTargets,
} from './Common.js';

type materialInstance = {
  texture: string;
  render_method: 'opaque' | 'alpha_test' | 'blend' | 'double_sided';
  face_dimming?: boolean;
  ambient_occlusion?: boolean;
};

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

  /**
   * Sets the display name for a block in the form of `tile.${value}.name`
   * (this display name format is something decided by minecraft)
   * @default value = undefined @param value String
   */
  displayName(value: string) {
    this.newComponent('minecraft:display_name', value);
    return this;
  }

  /**
   * Sets the block's collision with entities
   * @default value = { origin: [-8, 0, -8], size: [16, 16, 16] } @param value Either a boolean or an Object containing cuboid information
   * @param value.origin Specifies the starting corner of the cuboid
   * @param value.size Specifies how much the cuboid should extend from the starting corner in the positive direction
   */
  entityCollision(value: false | { origin: number[]; size: number[] } = { origin: [16, 16, 16], size: [-8, 0, -8] }) {
    this.newComponent('minecraft:entity_collision', value);
    return this;
  }

  /**
   * Sets the explosion resistance
   * @default value = 0.0 @param value A decimal
   */
  explosionResistance(value: number = 0.0) {
    this.newComponent('minecraft:explosion_resistance', value);
    return this;
  }

  /**
   * Sets the flamability of the block
   * @default value = { burn_odds: 0, flame_odds: 0 }
   * @param value.burn_odds An integer representing how likely a block is to be destroyed by fire
   * @param value.flame_odds An integer representing how likely a block is to catch fire
   */
  flammable(value = { burn_odds: 0, flame_odds: 0 }) {
    this.newComponent('minecraft:flammable', value);
    return this;
  }

  /**
   * Sets the friction of the block, lower = slower
   * @default value = 0.6 @param value A decimal
   */
  friction(value: number = 0.6) {
    this.newComponent('minecraft:friction', value);
    return this;
  }

  /**
   * Sets the geometry of the block, must be located in either 'models/entity' or 'model/blocks' in your resource pack
   * @default value = '' @param value A string
   */
  geometry(value: string = '') {
    this.newComponent('minecraft:geometry', value);
    return this;
  }

  /**
   * Sets whether the block can be pushed by pistons
   * @default value = false @param value A boolean
   */
  immovable(value: boolean = false) {
    this.newComponent('minecraft:immovable', value);
    return this;
  }

  /**
   * Sets the color of the block on a map
   * @default value = '' @param value A string representing a hex color
   */
  mapColor(value: string = '') {
    this.newComponent('minecraft:map_color', value);
    return this;
  }

  /**
   * Sets the color of the block on a map
   * @default value = '' @param value A string representing a hex color
   */
  materialInstances(
    value:
      | {
          [key: string]: materialInstance;
        }
      | {
          '*'?: materialInstance;
          up?: materialInstance;
          down?: materialInstance;
          north?: materialInstance;
          east?: materialInstance;
          south?: materialInstance;
          west?: materialInstance;
        },
  ) {
    this.newComponent('minecraft:material_instances', value);
    return this;
  }

  /**
   * Sets whether the block will stick to a sticky push, true = not stick
   * @default value = false @param value A boolean
   */
  onlyPistonPush(value: boolean = false) {
    this.newComponent('minecraft:onlypistonpush', value);
    return this;
  }

  /**
   * Sets the block's collision with the player's picking (when they hover over the block)
   * @default value = { origin: [-8, 0, -8], size: [16, 16, 16] } @param value Either a boolean or an Object containing cuboid information
   * @param value.origin Specifies the starting corner of the cuboid
   * @param value.size Specifies how much the cuboid should extend from the starting corner in the positive direction
   */
  pickCollision(value: false | { origin: number[]; size: number[] } = { origin: [16, 16, 16], size: [-8, 0, -8] }) {
    this.newComponent('minecraft:pick_collision', value);
    return this;
  }

  /**
   * Sets what blocks the block can survive while being connected to
   * @default value
   * @param value.conditions[].block_filter = An array of strings or block descriptors
   * @param value.conditions[].allowed_faces = An array of faces
   */
  placementFilter(value: {
    conditions: {
      block_filter: string[] | blockDescriptor[];
      allowed_faces: ['up'?, 'down'?, 'north'?, 'east'?, 'south'?, 'west'?] | ['up'?, 'down'?, 'side'?] | ['all'?];
    }[];
  }) {
    this.newComponent('minecraft:placement_filter', value);
    return this;
  }

  /**
   * Sets whether the block allows entities to jump while on it
   * @default value = false @param value A boolean
   */
  preventsJumping(value: boolean = false) {
    this.newComponent('minecraft:preventsjumping', value);
    return this;
  }

  /**
   * Runs an event on a random tick, speed can be controlled via '/gamerule randomtickspeed'
   * @default value JSON Object
   */
  randomTickingRaw(value: any) {
    this.newComponent('minecraft:random_ticking', value);
    return this;
  }

  /**
   * Runs an event on a random tick, speed can be controlled via '/gamerule randomtickspeed'
   * @param event A string that represents the event to look for and run
   * @param target A string that represents the target who's json will be searched for the event
   * @param condition A string that represents a molang expression that will be used to evaluate whether the event will run or not
   */
  randomTicking(event?: string, target?: eventTargets, condition?: string) {
    this.randomTickingRaw({ on_tick: { event: event, target: target, condition: condition } });
    return this;
  }

  /**
   * Sets the block's rotation via x-y-z order, locked to 90 degree
   * @default value = [0, 0, 0] @param value An array of numbers
   */
  rotation(value: [number, number, number]) {
    this.newComponent('minecraft:rotation', value);
    return this;
  }

  /**
   * Runs an event every x seconds depending on the specified range
   * @default value JSON Object
   */
  tickingRaw(value: any) {
    this.newComponent('minecraft:ticking', value);
    return this;
  }

  /**
   * Runs an event every x seconds depending on the specified range
   * @param looping A boolean that states whether or not event will repeatedly run
   * @param range An array of numbers that specifies when the event will run, a number between the two values will be picked
   * @param event A string that represents the event to look for and run
   * @param target A string that represents the target who's json will be searched for the event
   * @param condition A string that represents a molang expression that will be used to evaluate whether the event will run or not
   */
  ticking(range: [number, number], looping?: boolean, event?: string, target?: eventTargets, condition?: string) {
    this.tickingRaw({
      range: range,
      looping: looping,
      on_tick: { event: event, target: target, condition: condition },
    });
    return this;
  }

  /**
   * Sets the block geometry to standard block geometry
   */
  unitCube() {
    this.newComponent('minecraft:unit_cube', {});
    return this;
  }

  /**
   * Sets the whether the block can be pathed over by mobs, false = can be pathed over
   * @default value = false @param value A boolean
   */
  unwalkable(value = false) {
    this.newComponent('minecraft:unwalkable', value);
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
