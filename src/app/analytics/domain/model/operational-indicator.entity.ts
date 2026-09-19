export class OperationalIndicator {
  label: string;
  currentValue: number;
  previousValue: number;
  unit: string;

  constructor(resource: Partial<OperationalIndicator> & Pick<OperationalIndicator, 'label' | 'currentValue' | 'previousValue'>) {
    this.label = resource.label;
    this.currentValue = resource.currentValue;
    this.previousValue = resource.previousValue;
    this.unit = resource.unit || '';
  }

  get variation(): number {
    if (!this.previousValue) return 0;
    return Math.round(((this.currentValue - this.previousValue) / this.previousValue) * 100);
  }
}
