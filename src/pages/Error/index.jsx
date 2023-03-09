import "./Error.css";

/**
 *Renders not found page (404)
 * @returns
 */
function Error() {
  return (
    <div className="Error">
      <h1 className="Error-title">404</h1>
      <p>Oups! La page que vous demandez n'existe pas.</p>
    </div>
  );
}

export default Error;
