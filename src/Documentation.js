import React from 'react';
import ReactMarkdown from 'react-markdown/with-html';
import infoTemplate from '@open-rpc/generator-docs/templates/info.template.md.js';
import serverTemplate from '@open-rpc/generator-docs/templates/server.template.md.js';
import methodTemplate from '@open-rpc/generator-docs/templates/method.template.md.js';
import schemaToMarkdown from 'json-schema-to-markdown-table';

export default class Documentation extends React.Component {
  render() {
    return (
      <>
          {this.props.schema.info && <ReactMarkdown escapeHtml={false} source={infoTemplate({ info: this.props.schema.info })} />}
          {this.props.schema.servers && <ReactMarkdown escapeHtml={false} source={serverTemplate({servers: this.props.schema.servers})} />}
          {this.props.schema.methods && this.props.schema.methods.length > 0 && <ReactMarkdown source={'## Methods \n\n'} />}
          {this.props.schema.methods && <ReactMarkdown escapeHtml={false} source={this.props.schema.methods.map((m) => methodTemplate({method: m, schemaToMarkdown})).join('')} />}
      </>
    )
  }
}