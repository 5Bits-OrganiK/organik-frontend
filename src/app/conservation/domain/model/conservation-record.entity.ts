export class ConservationRecord {
  id: string;
  zone: string;
  productName: string;
  temperature: number;
  humidity: number;
  recordedAt: string;
  status: string;

  constructor(resource: ConservationRecord) {
    this.id = resource.id;
    this.zone = resource.zone;
    this.productName = resource.productName;
    this.temperature = resource.temperature;
    this.humidity = resource.humidity;
    this.recordedAt = resource.recordedAt;
    this.status = resource.status;
  }

  get isRisky(): boolean {
    return this.status === 'risk';
  }
}
