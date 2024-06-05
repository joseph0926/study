function createPerson(firstName, lastName) {
  return {
    firstName,
    lastName,
    fullName: function () {
      console.log(`My name is ${this.firstName} ${this.lastName}`);
    },
  };
}

const a = createPerson("Asdf", "Qwer");
a.fullName();

const b = createPerson("Zxcv", "1234");
b.fullName();

function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.fullName = function () {
    console.log(`My name is ${this.firstName} ${this.lastName}`);
  };
}
// 위의 방식은 prototype에 추가하는 것은 아님을 유의하자

const c = new Person("1234", "!!!!");
c.fullName();
