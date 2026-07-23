# 🚀 Enterprise RESTful Booker API & Performance Automation Framework

![API Tests](https://github.com/habebz20001-sys/restful-booker-api-performance-testing-framework/actions/workflows/test-pipeline.yml/badge.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)
![Playwright](https://img.shields.io/badge/Playwright-2EAD33?style=flat&logo=playwright&logoColor=white)
![Cucumber](https://img.shields.io/badge/Cucumber-23D96C?style=flat&logo=cucumber&logoColor=white)
![k6](https://img.shields.io/badge/k6-7D64FF?style=flat&logo=k6&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=flat&logo=githubactions&logoColor=white)

An enterprise-grade **API Automation**, **BDD**, and **Performance Testing** framework for the **RESTful Booker API**, built with **Playwright**, **Cucumber**, **TypeScript**, and **k6**. The framework follows modern QA best practices and includes automated CI/CD execution through GitHub Actions.

---

# ✨ Features

- ✅ BDD testing using **Cucumber** and **Gherkin**
- ✅ Fast API automation powered by **Playwright APIRequestContext**
- ✅ Complete CRUD API coverage
- ✅ Authentication & authorization validation
- ✅ Negative and edge-case testing
- ✅ Load & performance testing with **Grafana k6**
- ✅ CI/CD pipeline using **GitHub Actions**
- ✅ Clean, scalable project architecture

---

# 📋 Test Coverage

## API Functional Testing

### Authentication
- Generate authentication token
- Validate authenticated requests

### CRUD Operations
- Create Booking
- Get Booking
- Update Booking (PUT)
- Partial Update (PATCH)
- Delete Booking

### Security Testing
- Unauthorized requests
- Invalid token validation
- Forbidden access verification

### Negative Testing
- Invalid booking IDs
- Missing resources (404)
- Invalid request payloads
- Schema validation

---

# ⚡ Performance Testing

Performance tests are implemented using **Grafana k6**.

### Load Test Configuration

| Metric | Target |
|--------|--------|
| Virtual Users | 10 |
| p(95) Response Time | < 1000 ms |
| Failure Rate | < 1% |

---

# 📊 Performance Baseline

| Metric | Result |
|--------|--------|
| Total Requests | 230 |
| Virtual Users | 10 |
| Error Rate | **0.00%** |
| p(95) Response Time | **383.21 ms** |

✅ All configured performance thresholds were successfully met.

---

# 🛠 Tech Stack

| Category | Technology |
|----------|------------|
| Language | TypeScript |
| API Automation | Playwright APIRequestContext |
| BDD | Cucumber.js |
| Performance Testing | Grafana k6 |
| Assertions | Playwright Test |
| CI/CD | GitHub Actions |

---

# 📁 Project Structure

```text
.
├── .github/
│   └── workflows/               # GitHub Actions pipelines
├── features/                    # Gherkin feature files
│   └── booking.feature
├── src/
│   ├── api/                     # API client & request wrappers
│   │   └── bookingClient.ts
│   └── step-definitions/        # Cucumber step definitions
│       └── bookingSteps.ts
├── performance-tests/           # k6 performance scripts
│   └── loadTest.js
├── cucumber.json
├── tsconfig.json
├── package.json
└── README.md
```

---

# 🚀 Getting Started

## Prerequisites

- Node.js 18+
- npm
- Grafana k6 (for performance testing)

---

## Installation

```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/restful-booker-api-performance-testing-framework.git

cd restful-booker-api-performance-testing-framework

npm install
```

---

# ▶️ Running Tests

## Run API Automation Suite

```bash
npm test
```

## Run Performance Tests

```bash
npm run test:perf
```

---

# 🔄 CI/CD

The project includes a GitHub Actions workflow that automatically:

- Installs project dependencies
- Executes the complete API automation suite
- Generates execution results
- Validates performance thresholds
- Runs on every Push and Pull Request

---

# 📌 Highlights

- Enterprise-ready architecture
- Fast API execution
- BDD implementation
- Performance testing
- Security validation
- Scalable project structure
- Easy CI/CD integration

---

# 👨‍💻 Author

**Habib Ziyad**

Software QA & Automation Engineer