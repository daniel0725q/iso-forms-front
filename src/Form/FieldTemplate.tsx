interface FieldTemplateProps {
    field: any
}

const FieldTemplate = (props: FieldTemplateProps) => {
    const { id, type } = props.field;
    switch (type) {
      case 'string':
        return <input type="text" id={id} />;
      case 'file':
        return <input type="file" id={id} />;
      default:
        return null;
    }
  };

export default FieldTemplate;