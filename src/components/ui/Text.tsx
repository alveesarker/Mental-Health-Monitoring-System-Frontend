

// The argument is an object, and we immediately destructure 'text' from it,
// while also specifying the type of the expected object's properties.
const Text = ({ text }: { text: string }) => {
  return (
    <div className="text-3xl font-bold font-sans">
      {text}
    </div>
  );
};

export default Text;