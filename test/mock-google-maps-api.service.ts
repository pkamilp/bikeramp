export class MockGoogleMapsApiService {
  public isValidAddress = (address: string) => true;
  public getDistance = (startAddress: string, destinationAddress: string) => 100;
}
