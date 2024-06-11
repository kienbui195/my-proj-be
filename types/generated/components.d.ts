import type { Schema, Attribute } from '@strapi/strapi';

export interface DlAnswer extends Schema.Component {
  collectionName: 'components_dl_answers';
  info: {
    displayName: 'Answer';
  };
  attributes: {
    content: Attribute.Text;
    desc: Attribute.Text;
    is_correct: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<false>;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'dl.answer': DlAnswer;
    }
  }
}
