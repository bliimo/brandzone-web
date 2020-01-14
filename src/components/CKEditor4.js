import React, { PureComponent } from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';

class CKEditor4 extends PureComponent {
  render() {
    const { onChange, value, disabled } = this.props;
    return (
      <CKEditor
        disabled={disabled}
        onInit={editor => {
          console.log('Editor is ready to use!', editor);
          // Insert the toolbar before the editable area.
          editor.ui.getEditableElement().parentElement.insertBefore(editor.ui.view.toolbar.element, editor.ui.getEditableElement());
          editor.data.set(value);
        }}
        onChange={(event, editor) => onChange(editor.getData())}
        editor={DecoupledEditor}
        data={value}
        config={{
          cloudServices: {
            tokenUrl: 'https://41143.cke-cs.com/token/dev/R9IZB5Neu5oTjHHKfr4COIJCNwH8ta5AhzULymbpVdbF0khxWGcp6rsfwDdJ',
            uploadUrl: 'https://41143.cke-cs.com/easyimage/upload/'
          }
        }}
      />
    );
  }
}

export default CKEditor4;
