from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.core.cache import cache
from django.utils.crypto import get_random_string
import re
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth import password_validation
from django.core.exceptions import ValidationError

CustomUser  = get_user_model()

# Dummy function to simulate sending SMS (for local testing)
def send_sms(mobile_number, message):
    print(f"Simulating SMS sending to {mobile_number}: {message}")

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['username','email', 'mobile_number','gender','dob']  # Add other fields you need

class RegistrationSerializer(serializers.Serializer):
    """Serializer for validating user registration details."""
    username = serializers.CharField(max_length=150)
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    mobile_number = serializers.CharField(max_length=15)
    password_confirmation = serializers.CharField(write_only=True)
    dob=serializers.DateField()
    gender=serializers.CharField(max_length=10)

    def validate_mobile_number(self, value):
        if not re.match (r'^\+?[1-9]\d{1,14}$', value):  # E.164 format validation
            raise serializers.ValidationError("Invalid mobile number format.")
        return value

    def validate(self, data):
        if CustomUser .objects.filter(email=data['email']).exists():
            raise serializers.ValidationError({"email": "Email is already in use."})
        
        if CustomUser .objects.filter(mobile_number=data['mobile_number']).exists():
            raise serializers.ValidationError({"mobile_number": "Mobile number is already registered."})

        if data['password'] != data['password_confirmation']:
            raise serializers.ValidationError({"password_confirmation": "Passwords do not match."})

        return data

class OTPVerificationSerializer(serializers.Serializer):
    """Serializer for verifying OTP and creating user."""
    
    otp = serializers.CharField(max_length=4)

    def validate(self, data):
        mobile_number = self.context['view'].kwargs.get('mobile_number')
        otp = data.get("otp")

        if not mobile_number or not otp:
            raise serializers.ValidationError({"error": "Missing required fields."})

        cache_key = f"otp_{mobile_number}"
        user_data = cache.get(cache_key)
        if not user_data:
            raise serializers.ValidationError({"error": "OTP expired or invalid."})

        if user_data.get("otp") != otp:
            raise serializers.ValidationError({"error": "Invalid OTP."})

        return data

class PasswordResetRequestSerializer(serializers.Serializer):
    email = serializers.EmailField()

class PasswordResetVerifySerializer(serializers.Serializer):
    uid = serializers.CharField()
    token = serializers.CharField()
    new_password = serializers.CharField(write_only=True)
    confirm_password = serializers.CharField(write_only=True)

    def validate(self, data):
        new_password = data['new_password']
        confirm_password = data['confirm_password']
        
        if new_password != confirm_password:
            raise serializers.ValidationError({"confirm_password": "Passwords do not match."})

        try:
            password_validation.validate_password(new_password)
        except ValidationError as e:
            raise serializers.ValidationError({"new_password": e.messages})

        return data

class LoginSerializer(serializers.Serializer):
    """Serializer for login requests."""
    identifier = serializers.CharField(max_length=150)  # Email or mobile number
    password = serializers.CharField(write_only=True, required=False)
    otp = serializers.CharField(write_only=True, required=False)
    login_type = serializers.ChoiceField(choices=['password', 'otp'])


# CustomUserSerializer

# For retrieving user details (e.g., profile, listing users).
# Includes all fields like id, username, email, mobile_number, and is_verified.

# RegistrationSerializer

# Validates the input during registration (username, email, password, mobile number).
# Ensures that the email and mobile number are unique.

# OTPVerificationSerializer

# Verifies the OTP provided by the user.
# If OTP is valid, the serializer returns the temporarily stored user details for creating the user in the database.


# get_404 

