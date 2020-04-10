import Header from "./header";

export default function(props) {
  const layoutStyle = {
    margin: 20
  };

  return (
    <div style={layoutStyle}>
      <Header />

      <div className="content">{props.children}</div>
      <style jsx>
        {`
          .content {
            margin-top: 20px;
            padding-left: 10px;
          }
        `}
      </style>
    </div>
  );
}
