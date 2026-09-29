# Wanda Central Redesign Plan

## ✅ Changes Requested

1. **Menu Structure:**
   - Remove: Dashboard, Projects, Jobs, Integrations
   - Add: Content, GSC & GA, YouTube, Mentions, Google & Traffic
   - Each integration = 1 menu item

2. **API Key Pages:**
   - Each page shows API key with one-click copy
   - Domain configuration field
   - Usage example code
   - Integration status

3. **Merged View:**
   - Combine dashboard + projects + integrations
   - Show overall metrics
   - Quick access to all APIs

4. **GSC Import Wizard:**
   - Better step 3 explanation ✅ DONE
   - Explain which Google account to select
   - Show how OAuth works
   - Confirm it actually works

## 📋 New Menu Items

### 1. Content
- API Key: hfc_2x8RueOc4ptHsJaAuaCbHbyJU2X9RzP4
- One-click copy button
- Domain field for marketplacestudio.nl
- Example code
- 200 requests/day counter

### 2. GSC & GA  
- OAuth setup button
- Which account explanation
- Import wizard (improved) ✅ DONE
- API endpoints list
- Project ID after setup

### 3. YouTube
- API key field (user provides)
- Setup instructions
- Channel ID field
- Stats display

### 4. Mentions
- Integration service selection
- API key field
- Keywords tracking
- Recent mentions list

### 5. Google & Traffic
- Remote Browser API
- API Key: JTYDA_7531D_98HGTR_YT154
- One-click copy
- Session management
- Traffic generation

## 🎯 Implementation

Creating new simplified App.tsx with:
- 5 main pages (one per integration)
- API key display with copy button
- Domain configuration
- Real-time status
- Usage examples

All pages follow same pattern:
1. API key section (copy button)
2. Domain configuration
3. Setup instructions
4. Code examples
5. Current status/metrics
