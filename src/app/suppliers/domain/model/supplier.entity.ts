export class Supplier {
  id: string;
  businessName: string;
  ruc: string;
  email: string;
  phone: string;
  address: string;
  specialty: string;
  coverageArea: string;

  constructor(resource: Supplier) {
    this.id = resource.id;
    this.businessName = resource.businessName;
    this.ruc = resource.ruc;
    this.email = resource.email;
    this.phone = resource.phone;
    this.address = resource.address;
    this.specialty = resource.specialty;
    this.coverageArea = resource.coverageArea;
  }
}
