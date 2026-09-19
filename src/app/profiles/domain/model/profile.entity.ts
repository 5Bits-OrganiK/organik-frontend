export class Profile {
  id: string;
  userId: string;
  type: string;
  businessName: string;
  phone: string;
  address: string;
  district?: string;
  specialty?: string;
  coverageArea?: string;

  constructor(resource: Profile) {
    this.id = resource.id;
    this.userId = resource.userId;
    this.type = resource.type;
    this.businessName = resource.businessName;
    this.phone = resource.phone;
    this.address = resource.address;
    this.district = resource.district;
    this.specialty = resource.specialty;
    this.coverageArea = resource.coverageArea;
  }

  get displayArea(): string {
    return this.coverageArea || this.district || 'Sin zona asignada';
  }
}
