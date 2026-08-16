/*
MIT License

Copyright (c) 2023 Nik Sudan

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

import { D20 } from '../../common/die';

// This class includes code originating with https://github.com/niksudan/alien-namegen
// The alien-namegen codebase is distributed under the MIT license, and is
// Copyright (c) 2023 Nik Sudan
export class AlienNameGenerator {
  static readonly commonSuffixes = ['Prime', 'Alpha', 'Beta', 'Gamma', 'Delta'];
  static readonly commonSectorPrefixes = [
    'Proxima',
    'Meta',
    'Gamma',
    'Alpha',
    'Neo',
    'Sigma',
  ];
  static readonly commonSectorSuffixes = [
    'Rift',
    'Helion',
    'Prime',
    'Zeta',
    'Cluster',
    'Expanse',
    'Sector',
  ];

  static readonly vowels = ['a', 'e', 'i', 'o', 'u'];
  static readonly fillers = [
    'b',
    'c',
    'd',
    'f',
    'g',
    'h',
    'j',
    'k',
    'l',
    'm',
    'n',
    'p',
    'q',
    'r',
    's',
    't',
    'v',
    'w',
    'x',
    'y',
    'z',
    'ch',
    'sh',
    'th',
    'zh',
    'dr',
    'fr',
    'tr',
    'pr',
    'gr',
    'cr',
    'pthl',
    'zsh',
    'zs',
  ];

  static getRandom(items: string[]) {
    const index = Math.floor(Math.random() * items.length);
    return items[index];
  }

  static getName() {
    let name = '';
    if (Math.random() > 0.7) {
      name +=
        AlienNameGenerator.getRandom(AlienNameGenerator.fillers) +
        AlienNameGenerator.getRandom(AlienNameGenerator.vowels);
    }
    const vowel = AlienNameGenerator.getRandom(AlienNameGenerator.vowels);
    name += AlienNameGenerator.getRandom(AlienNameGenerator.fillers) + vowel;
    if (Math.random() > 0.8) {
      name += vowel;
    }
    if (Math.random() > 0.95) {
      name += "'";
    }
    if (Math.random() > 0.5) {
      name += AlienNameGenerator.getRandom(AlienNameGenerator.fillers);
    }
    if (Math.random() > 0.8) {
      name +=
        AlienNameGenerator.getRandom(AlienNameGenerator.fillers) +
        AlienNameGenerator.getRandom(AlienNameGenerator.vowels);
    }
    return `${name.charAt(0).toUpperCase()}${name.slice(1)}`;
  }

  static generateSectorName() {
    let name = '';
    const countFactor = D20.roll();
    const maxNames = countFactor > 18 ? 3 : countFactor > 8 ? 2 : 1;
    let hasPrefix = false;
    for (let i = 0; i < maxNames; i++) {
      if (
        maxNames > 1 &&
        i === maxNames - 1 &&
        (!hasPrefix || maxNames > 2) &&
        Math.random() >= 0.75
      ) {
        name +=
          AlienNameGenerator.commonSectorSuffixes[
            Math.floor(
              Math.random() * AlienNameGenerator.commonSectorSuffixes.length,
            )
          ];
      } else if (i === 0 && maxNames > 1 && Math.random() >= 0.75) {
        hasPrefix = true;
        name +=
          AlienNameGenerator.commonSectorPrefixes[
            Math.floor(
              Math.random() * AlienNameGenerator.commonSectorPrefixes.length,
            )
          ] + ' ';
      } else {
        name += AlienNameGenerator.getName();
        if (Math.random() > 0.8) {
          name += '-' + AlienNameGenerator.getName();
        }
      }
      if (i + 1 < maxNames) {
        name += ' ';
      }
    }
    return name;
  }

  static generatePlanetName() {
    let name = '';
    const maxNames = Math.random() > 0.2 ? 2 : 1;
    for (let i = 0; i < maxNames; i++) {
      if (i > 0 && Math.random() >= 0.95) {
        name +=
          AlienNameGenerator.commonSuffixes[
            Math.floor(Math.random() * AlienNameGenerator.commonSuffixes.length)
          ];
      } else {
        name += AlienNameGenerator.getName();
        if (Math.random() > 0.8) {
          name += '-' + AlienNameGenerator.getName();
        }
      }
      if (i + 1 < maxNames) {
        name += ' ';
      }
    }
    return name;
  }
}
