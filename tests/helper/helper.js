const Chance = require('chance');
const chance = new Chance();

export function randomData() {
    return {
        phone: chance.phone(),
        name: chance.name(),
        email: chance.email(),
        company: chance.company(),
        address: chance.address(),
        state: chance.state(),
        city: chance.city(),
        zipcode: chance.zip(),
        password: chance.timestamp(),
        text: chance.paragraph(),
        creditCard: chance.cc()
    }
}

/* REMINDER

require is CommonJS syntax.
export is ESM syntax.

for require must have "type": "module" in your package.json
for export it is not mandatory

*/

