export function Spinner() {
  return (
    <div className='spinner'>
      <style jsx>{`
        .spinner {
          border: 1em solid #f3f3f3;
          border-top: 1em solid #000011;
          border-radius: 50%;
          width: 4em;
          height: 4em;
          animation: spin 2s linear infinite;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
