import { type SchemaTypeDefinition } from "sanity";

import { blockContentType } from "./blockContentType";
import { postType } from "./postType";
import { authorType } from "./authorType";
import { featuredFlavorType } from "./featuredFlavorType";
import { ourStoryType } from "./ourStoryType";

import { heroType } from "./heroType";
import { menuCategoryType } from "./menuCategoryType";
import { menuItemType } from "./menuItemType";
import { categoryType } from "./categoryType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType,
    postType,
    authorType,
    categoryType,
    featuredFlavorType,
    ourStoryType,
    heroType,
    menuCategoryType,
    menuItemType,
  ],
};
