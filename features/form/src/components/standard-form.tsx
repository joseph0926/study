import React from "react";

export function StandardForm() {
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">이름:</label>
      <input id="name" name="name" required />

      <label htmlFor="email">이메일:</label>
      <input id="email" name="email" type="email" required />

      <button type="submit">제출</button>
    </form>
  );
}
