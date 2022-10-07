class EarthRoute {
  static vault = [];
  transfer(parcel) {
    parcel.destination = "Earth";
    EarthRoute.vault.push(parcel);
  }
}

class MoonRoute {
  static warehouse = [];
  transfer(parcel) {
    parcel.destination = "Moon";
    MoonRoute.warehouse.push(parcel);
  }
}

const extendTransportSystem = (EarthRoute, MoonRoute) => {
  const array = [];

  EarthRoute.prototype.transfer = (parcel) => {
    parcel.destination = "Earth";
    EarthRoute.vault.push(parcel);
    array.push({...parcel, origin: "Earth", destination: "Mothership"});
  }

  MoonRoute.prototype.transfer = (parcel) => {
    parcel.destination = "Moon";
    MoonRoute.warehouse.push(parcel);
    array.push({...parcel, origin: "Moon", destination: "Mothership"});
  }

  return array;
}

const mothershipStorage = extendTransportSystem(EarthRoute, MoonRoute);

const earthRoute1 = new EarthRoute();
const moonRoute2 = new MoonRoute();

earthRoute1.transfer({ content: 123 });
moonRoute2.transfer({ text: "abc" });

console.log(mothershipStorage)
/* [
 *   { content: 123, origin: 'Earth', destination: 'Mothership' },
 *   { text: 'abc', origin: 'Moon', destination: 'Mothership' }
 * ]
 */

console.log(EarthRoute.vault)
/* [
 *   { content: 123, destination: 'Earth' }
 * ]
 */

console.log(MoonRoute.warehouse)
/* [
 *   { text: 'abc', destination: 'Moon' }
 * ]
 */
