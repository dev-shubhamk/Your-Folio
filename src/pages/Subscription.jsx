import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, CreditCard, Zap, Shield, Crown } from 'lucide-react';

function Subscription() {
  const [billingCycle, setBillingCycle] = useState('monthly');
  
  const plans = [
    {
      id: 'free',
      name: 'Starter',
      icon: <Zap size={24} />,
      priceMonthly: '$0',
      priceYearly: '$0',
      description: 'Perfect to try out the editor and build a basic page.',
      features: ['1 Portfolio Site', 'yourfolio subdomain', 'Basic Templates', 'Standard Support'],
      buttonText: 'Current Plan',
      popular: false
    },
    {
      id: 'pro',
      name: 'Pro',
      icon: <Crown size={24} />,
      priceMonthly: '$12',
      priceYearly: '$9',
      description: 'Unlock your full potential with advanced features and AI.',
      features: ['Unlimited Sites', 'Custom Domains', 'Premium Templates', 'Foliomate Assistant access', 'Analytics Dashboard', 'Priority 24/7 Support'],
      buttonText: 'Upgrade to Pro',
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Studio',
      icon: <Shield size={24} />,
      priceMonthly: '$39',
      priceYearly: '$29',
      description: 'For agencies and designers building for clients.',
      features: ['White-label Sites', 'Client Billing', 'Team Collaboration', 'Custom CSS/JS', 'Dedicated Account Manager'],
      buttonText: 'Contact Sales',
      popular: false
    }
  ];

  return (
    <div className="page-container subscription-container">
      <div className="subs-header">
        <h1>Upgrade Your Workspace</h1>
        <p>Choose the perfect plan for your professional journey.</p>
        
        <div className="billing-toggle">
          <span className={billingCycle === 'monthly' ? 'active' : ''}>Monthly</span>
          <button 
            className={`toggle-switch ${billingCycle}`}
            onClick={() => setBillingCycle(b => b === 'monthly' ? 'yearly' : 'monthly')}
          >
            <motion.div className="knob" layout transition={{ type: 'spring', stiffness: 500, damping: 30 }} />
          </button>
          <span className={billingCycle === 'yearly' ? 'active' : ''}>Yearly <span className="badge">Save 25%</span></span>
        </div>
      </div>

      <div className="pricing-grid">
        {plans.map(plan => (
          <motion.div 
            key={plan.id}
            className={`pricing-card ${plan.popular ? 'popular' : ''}`}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
          >
            {plan.popular && <div className="popular-badge">Most Popular</div>}
            <div className="card-header">
              <div className="plan-icon">{plan.icon}</div>
              <h3>{plan.name}</h3>
              <p>{plan.description}</p>
            </div>
            
            <div className="plan-price">
              <h2>{billingCycle === 'monthly' ? plan.priceMonthly : plan.priceYearly}</h2>
              <span>/ month</span>
            </div>
            
            <ul className="plan-features">
              {plan.features.map((feat, i) => (
                <li key={i}><Check size={16} className="check-icon" /> {feat}</li>
              ))}
            </ul>
            
            <button className={`plan-btn ${plan.popular ? 'primary' : 'secondary'}`}>
              {plan.id !== 'free' && <CreditCard size={18} />} {plan.buttonText}
            </button>
          </motion.div>
        ))}
      </div>
      
      <div className="payment-methods-showcase">
        <p>We accept all major secure payment methods:</p>
        <div className="payment-icons">
          <span className="pay-chip">Visa</span>
          <span className="pay-chip">Mastercard</span>
          <span className="pay-chip">PayPal</span>
          <span className="pay-chip">Apple Pay</span>
          <span className="pay-chip">Google Pay</span>
        </div>
      </div>
    </div>
  );
}

export default Subscription;
