export default () => (
  <div>
    <div className="yellow">
      <h1>I am yellow</h1>
    </div>
    <style jsx global>
      {`
        .global {
          .yellow {
            color: yellow;
          }
        }
      `}
    </style>
  </div>
);
