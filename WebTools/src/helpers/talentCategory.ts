import i18next from 'i18next';
import type { Career } from './careerEnum';
import type { Department } from './department';
import { DepartmentsHelper } from './department';
import type { Species } from './speciesEnum';
import { makeKey } from '../common/translationKey';
import { SpeciesHelper } from './species';
import { CareersHelper } from './careers';

export enum TalentCategory {
  General,
  Career,
  Enhancement,
  Starship,
  Starbase,
  Esoteric,
  Species,
  Department,
  SpecialRule,
}

export class TalentCategorization {
  readonly category: TalentCategory;
  readonly type?: Species[] | Career[] | Department[];

  constructor(
    category: TalentCategory,
    ...type: Species[] | Career[] | Department[]
  ) {
    this.category = category;
    this.type = type;
  }

  includes(item: Species | Department | Career) {
    return (this.type as any[]).includes(item);
  }

  get localizedDescription() {
    let result = i18next.t(
      makeKey('TalentCategory.', TalentCategory[this.category]),
    );

    if (this.category === TalentCategory.Species && this.type != null) {
      if (this.type.length) {
        result +=
          ' (' +
          this.type
            .map((t) => SpeciesHelper.getSpeciesByType(t as Species))
            .filter((s) => s != null)
            .map((t) => t.localizedName)
            .join('/') +
          ')';
      }
    } else if (this.category === TalentCategory.Career && this.type != null) {
      if (this.type.length) {
        result +=
          ' (' +
          this.type
            .map((t) => CareersHelper.instance.getCareerByType(t as Career))
            .filter((c) => c != null)
            .map((t) => t.localizedName)
            .join('/') +
          ')';
      }
    } else if (
      this.category === TalentCategory.Department &&
      this.type != null
    ) {
      if (this.type.length) {
        result +=
          ' (' +
          this.type
            .map((t) =>
              DepartmentsHelper.instance.getDepartmentName(t as Department),
            )
            .filter((c) => c != null)
            .join('/') +
          ')';
      }
    }

    return result;
  }
}
