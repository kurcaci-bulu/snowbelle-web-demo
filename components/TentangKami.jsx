import { useQuery, gql } from '@apollo/client';
import { BLOCKS, MARKS } from '@contentful/rich-text-types';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

const document = {
  nodeType: 'document',
  data: {},
  content: [
    {
      nodeType: 'paragraph',
      data: {},
      content: [
        {
          nodeType: 'text',
          value: 'Hello',
          data: {},
          marks: [{ type: 'bold' }],
        },
        {
          nodeType: 'text',
          value: ' world!',
          data: {},
          marks: [{ type: 'italic' }],
        },
      ],
    },
  ],
};

const options = {
  renderMark: {
    [MARKS.BOLD]: (text) => `<custom-bold>${text}<custom-bold>`,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, next) => `${next(node.content)}`,
  },
};

const TentangKami = ({ data }) => {
  return (
    <div className="container">
      <h2 className="heading heading--title">
        {data?.tentangKamiCollection.items[0].judulTentangKami}
      </h2>
      <p className="heading heading--paragraph">
        {documentToHtmlString(data?.tentangKamiCollection.items[0].kontenTentangKami.json, options)}
      </p>
    </div>
  );
};

export default TentangKami;
