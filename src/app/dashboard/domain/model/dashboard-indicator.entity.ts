export class DashboardIndicator {
  title: string;
  type: string;
  value: number;
  variation: number;
  severity: string;

  constructor(resource: DashboardIndicator) {
    this.title = resource.title;
    this.type = resource.type;
    this.value = resource.value;
    this.variation = resource.variation || 0;
    this.severity = resource.severity || 'normal';
  }
}
