import * as fs from 'fs';

type config = {
  outputPath: string;
  minimizeJSON: boolean;
  JSONIndent: string;
};
export const config: config = JSON.parse(fs.readFileSync('./unshatterable-config.json') + '');

export type categories = 'None' | 'Commands' | 'Construction' | 'Nature' | 'Items' | 'Equipment';
export type propertyValArr = string[] | number[] | boolean[] | object;
export type propertyVal = string | number | boolean;

export const clamp = (num: number, min: number, max: number) => {
  return Math.max(Math.min(num, max), min);
};

export class Event {}

export class Property {
  identifier: string;
  value: propertyValArr;

  constructor(identifier: string, value: propertyValArr) {
    this.identifier = identifier;
    this.value = value;
  }
}

export class Component {
  identifier: string;
  data: any;

  constructor(identifier: string, data: object) {
    (this.identifier = identifier), (this.data = data);
  }
}

export class Permutation {
  components = new Map<string, Component>();

  /**
   * Registers a component to the permutation
   * @param identifier Component Identifier
   * @param data Component Data
   */
  newComponent(identifier: string, data: any) {
    const comp = new Component(identifier, data);
    this.components.set(identifier, comp);

    return this;
  }
}

export class Registry {
  static createFile(subfolder: string, fileName: string, data: any, extension: string = '.json') {
    try {
      fs.mkdirSync(config.outputPath);
    } catch (err) {}
    try {
      fs.mkdirSync(`${config.outputPath}/${subfolder}/`);
    } catch (err) {}
    const FILEPATH = `${config.outputPath}/${subfolder}/${fileName}${extension}`;

    if (config.minimizeJSON) {
      fs.writeFileSync(FILEPATH, JSON.stringify(data));
    } else fs.writeFileSync(FILEPATH, JSON.stringify(data, null, config.JSONIndent));
  }

  static registerCommon(obj: any, objKey: string, buildFrom: any, additional: { identifier: string }) {
    obj[objKey].description.identifier = additional.identifier;

    mapToObj(buildFrom.properties, obj[objKey].description.properties, 'value');
    mapToObj(buildFrom.init.components, obj[objKey].components, 'data');
    for (let i of buildFrom.permutations.keys()) {
      const permutation = buildFrom.permutations.get(i);
      let data = {
        condition: i,
        components: {},
      };
      mapToObj(permutation?.components, data.components, 'data');
      obj[objKey].permutations.push(data);
    }
  }
}

export function mapToObj(map: any, to: any, key?: any) {
  for (let i of map.keys()) {
    const v = map.get(i);
    if (key) {
      to[i] = v[key];
    } else to[i] = v;
  }
}
