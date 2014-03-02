int THRESHOLD = 80;

void setup() {
  Serial.begin(9600);
  pinMode(13, OUTPUT);
}

void loop() {
  int sensorValue = 0;
  if (Serial.available()) {
    char ch = Serial.read();
    digitalWrite(13, ch - '0');
  }
  sensorValue = analogRead(A0);
  if (sensorValue < THRESHOLD) {
    Serial.print("1");
  }
}


