
char mode = 0;

void setup() {
  // initialize serial communication at 9600 bits per second:
  Serial.begin(9600);
  pinMode(13, OUTPUT);
}

void loop() {
  int sensorValue = 0;
  if (Serial.available()) {
    char ch = Serial.read();
    mode = ch - '0';
    digitalWrite(13, mode);
  }
  //if (mode) {
    sensorValue = analogRead(A0);
    if (sensorValue < 90) {
      Serial.print("1");
    }
  //}
}
