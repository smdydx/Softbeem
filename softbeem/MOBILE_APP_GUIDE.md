# 📱 Softbeem Mobile App - Setup Guide

## 🎯 Quick Start

Aapke mobile app ke liye **3 testing options** hain:

---

## Option 1: 🚀 Physical Device pe Test (Sabse Easy!)

### Requirements:
- Android/iOS phone
- Expo Go app (Play Store/App Store se download karein)
- Phone aur Replit same WiFi network pe hone chahiye (ya tunnel mode use karein)

### Steps:
1. **Replit mein "Mobile App" workflow run karein** (already configured hai)
2. Console mein QR code dikhega
3. **Expo Go app open karein** apne phone mein
4. **QR code scan karein** ya URL manually enter karein
5. App instantly open ho jayega! 🎉

**Tunnel Mode** (kisi bhi network se connect karne ke liye):
```bash
cd softbeem
npx expo start --tunnel
```

---

## Option 2: 🏗️ APK Build (Production Ready)

### APK kaise banayein:

1. **EAS account banayein** (agar nahi hai):
   - Visit: https://expo.dev/signup
   - Free tier available hai

2. **Replit Shell mein login karein**:
   ```bash
   cd softbeem
   eas login
   ```

3. **APK build kare in options**:

   **Testing ke liye (Preview APK):**
   ```bash
   eas build --profile preview --platform android
   ```

   **Production APK:**
   ```bash
   eas build --profile production --platform android
   ```

4. **Build process** (10-15 minutes):
   - Build cloud mein hoga
   - Terminal close kar sakte hain
   - Dashboard link milega track karne ke liye

5. **APK download karein**:
   - EAS dashboard se directly download
   - Ya QR code scan karke phone mein install
   - Ya local computer pe download karke emulator mein run karein

---

## Option 3: 🌐 Web Preview (Browser Testing)

```bash
cd softbeem
npx expo start --web
```

Browser mein khulega, but limited features honge (native modules nahi chalenge).

---

## 📋 Useful Commands

### Development:
```bash
# Start dev server
npx expo start

# Start with tunnel (remote access)
npx expo start --tunnel

# Web version
npx expo start --web

# Clear cache
npx expo start --clear
```

### EAS Build:
```bash
# Check build status
eas build:list

# View specific build
eas build:view [BUILD_ID]

# Cancel build
eas build:cancel
```

---

## 🔧 Configuration Files

### ✅ Already Configured:
- `eas.json` - APK build settings configured
- `app.json` - App configuration with EAS project ID
- All profiles build **APK** (not AAB)

### Build Profiles:
- **development**: Testing with dev features
- **preview**: Testing production-like build
- **production**: Final release build

---

## 🚨 Important Notes

### ⚠️ Android Emulator in Replit:
- Replit mein **Android emulator nahi chal sakta** (virtualization support nahi hai)
- APK build karke local computer pe emulator mein run karein
- Ya physical device use karein testing ke liye

### 🔑 Credentials:
- Pehli build pe EAS automatically keystore generate karega
- Keystore safely EAS account mein store hota hai
- Production builds ke liye same keystore use hoga

### 📦 File Size:
- Development APK: ~50-100 MB
- Production APK: Optimized (~20-50 MB)

---

## 🎯 Recommended Workflow

### Development Phase:
1. **Expo Go app use karein** quick testing ke liye
2. Code changes instant reflect honge (Fast Refresh)
3. Multiple devices pe ek saath test kar sakte hain

### Testing Phase:
1. **Preview APK build karein** production-like testing ke liye
2. Physical device ya emulator mein install karein
3. Real-world scenarios test karein

### Release Phase:
1. **Production APK build karein**
2. Play Store upload ke liye ya direct distribution

---

## 🆘 Common Issues

### Issue: QR code scan nahi ho raha
**Fix:** Expo Go app latest version hai check karein, ya URL manually enter karein

### Issue: "Network error" aa raha hai
**Fix:** 
- Same WiFi network check karein
- Tunnel mode use karein: `npx expo start --tunnel`
- Firewall settings check karein

### Issue: APK install nahi ho raha
**Fix:**
- "Unknown sources" se install allow karein Settings mein
- Signature verification error aaye to keystore consistent use karein

### Issue: Build fail ho rahi hai
**Fix:**
- `expo-doctor` run karein dependencies check karne ke liye
- `npx expo install --check` aur `--fix` use karein

---

## 📞 Support Resources

- **Expo Docs**: https://docs.expo.dev
- **EAS Build Guide**: https://docs.expo.dev/build/introduction/
- **Replit + Expo**: https://docs.replit.com/tutorials/expo-on-replit
- **Expo Community**: https://chat.expo.dev

---

## 🎉 Success Tips

1. **Development mein Expo Go use karein** - Fastest testing
2. **Production testing ke liye APK build karein** - Real experience
3. **Tunnel mode use karein** - Network issues avoid karne ke liye
4. **EAS Build dashboard monitor karein** - Build status track karne ke liye

---

**Happy Building! 🚀**
