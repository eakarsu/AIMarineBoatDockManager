# Audit Note — AIMarineBoatDockManager

Source audit: `_AUDIT/reports/batch_05.md` § 12

## Original audit recommendations

### Missing AI endpoints
- `/weather-impact-forecast`
- `/occupancy-optimizer`
- `/tenant-churn-predictor`
- `/maintenance-cost-forecaster`
- `/emergency-preparedness-plan`

### Missing non-AI features
- Tenant/guest communication portal
- Mobile app
- Payment processor integration
- Fuel consumption reconciliation
- Environmental compliance docs
- Coast Guard incident reporting

### Custom feature suggestions
- Agentic slip assignment
- Streaming weather intelligence
- Autonomous maintenance scheduling
- Tenant lifecycle agent
- Environmental monitoring dashboard
- Revenue optimization

## Implemented in this pass
1. **POST `/api/ai/occupancy-optimizer`** — pulls slips + boats from DB, returns structured reassignment recommendations and vessel-type demand forecast.
2. **POST `/api/ai/tenant-churn-predictor`** — scores churn risk across tenants with retention playbook.

Both follow the existing `routes/ai.js` style (`callOpenRouter`, `persistAIResult`, `parseAIJson`, shared `aiRateLimiter`). Syntax checked.

## Backlog (priority order)

### Mechanical
- `/maintenance-cost-forecaster` (uses workOrders / equipment data)
- `/emergency-preparedness-plan` (extends existing hurricanePrep + weather context)
- `/weather-impact-forecast` (combines weather route data + revenue model)

### Needs creds / external SDK
- Payment processor (Stripe, etc.)
- Coast Guard / incident reporting APIs
- Real-time weather feeds for streaming intelligence
- SMS/email tenant comms

### Needs product decision
- Tenant/guest portal scope (auth model, view-only role)
- Mobile app (out of backend scope)
- Environmental sensor schema
- Fuel reconciliation rules

## Apply pass 3 (frontend)

- **Status:** LEFT-AS-IS. Frontend already wires the apply-2 endpoints.
- `client/src/featureConfigs.js` registers `occupancy-optimizer` (line 683) and `tenant-churn-predictor` (line 690), and includes them in the marina dashboard `features` group.
- Auth Bearer header from `localStorage.token` is set globally in `client/src/api.js` axios interceptor.
- No FE changes needed. No deps installed.
