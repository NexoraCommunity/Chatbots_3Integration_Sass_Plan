const Checkbox = () => {
  return (
    <div>
      <label className="flex items-center gap-2 cursor-pointer">
        <input type="radio" name="role" className="peer hidden" />
        <div
          className="
    w-5 h-5 rounded-full border-2 border-gray-300
    peer-checked:border-[#01D2B3]
    flex items-center justify-center
  "
        >
          <div
            className="
      w-2.5 h-2.5 rounded-full
      scale-0 peer-checked:scale-100 transition
    "
          />
        </div>
      </label>
    </div>
  );
};

export { Checkbox };
