// React Components
import React, { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
// Styles
import styles from "../RegisterTenancy/register-user.module.scss";

// Validation
import { isLandlord } from "./validation";

// Constants
import { UPDATE_LANDLORD_INFO } from "./constants";

// Custom Components
import Input from "../Input";
import InputCheck from "../InputCheck";
import Button from "../Button";
import Loader from "react-loader-spinner";

const LandlorDetails = ({ step, setStep, tenancy, setTenancy }) => {
  const [errors, setErrors] = useState({});
  const [isProcessing, setProcessingTo] = useState(false);

  // Handle on change
  const handleLandlord = ({ target }) => {
    setTenancy({
      type: UPDATE_LANDLORD_INFO,
      payload: { [target.name]: target.value },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const api_rimbo_tenancies = process.env.REACT_APP_API_RIMBO;
    // Production axios: `${api_rimbo_tenancies}`;
    // Development axios : "http://localhost:8080/api/tenancies"

    const errors = isLandlord(tenancy.landlordDetails);
    setErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setProcessingTo(true);
    await axios.post(`${api_rimbo_tenancies}`, {
      // tenant
      tenantsName: tenancy.tenantDetails.tenantName,
      tenantsEmail: tenancy.tenantDetails.tenantEmail,
      tenantsPhone: tenancy.tenantDetails.tenantPhone,
      // agency, agent
      agencyName: tenancy.agencyName,
      agencyEmailPerson: tenancy.agencyEmailPerson,
      agencyContactPerson: tenancy.agencyContactPerson,
      agencyPhonePerson: tenancy.agencyPhonePerson,
      isAgentAccepted: tenancy.landlordDetails.isAgentAccepted,
      // property
      rimboService: tenancy.propertyDetails.rimboService,
      rentalDuration: tenancy.propertyDetails.rentalDuration,
      rentalCity: tenancy.propertyDetails.rentalCity,
      rentalPostalCode: tenancy.propertyDetails.rentalPostalCode,
      monthlyRent: tenancy.propertyDetails.monthlyRent,
      rentalAddress: tenancy.propertyDetails.rentalAddress,
      // landlord
      landlordName: tenancy.landlordDetails.landlordName,
      landlordEmail: tenancy.landlordDetails.landlordEmail,
      landlordPhone: tenancy.landlordDetails.landlordPhone,
      // tenancy
      product: tenancy.propertyDetails.rimboService,
      rentDuration: tenancy.propertyDetails.rentalDuration,
      rentAmount: tenancy.propertyDetails.monthlyRent,
      // property manager
      PMName: tenancy.agencyName,
    });

    setStep(step + 1);
    console.log(tenancy);
  };

  return (
    <form onSubmit={handleSubmit} className="styles.RegisterForm">
      <div className={styles.FormIntern}>
        <div className={styles.FormLeft}>
          <Input
            type="text"
            name="landlordName"
            value={tenancy.landlordDetails.landlordName}
            label="Landlord full name"
            placeholder="Enter name and surname"
            onChange={(e) => handleLandlord(e)}
            error={errors.landlordName}
          />
          <Input
            type="email"
            name="landlordEmail"
            value={tenancy.landlordDetails.landlordEmail}
            label="Landlord email"
            placeholder="Enter a valid email address"
            onChange={(e) => handleLandlord(e)}
            error={errors.landlordEmail}
          />
        </div>

        <div className={styles.FormRight}>
          <Input
            type="tel"
            name="landlordPhone"
            value={tenancy.landlordDetails.landlordPhone}
            label="Landlord phone number"
            placeholder="Enter phone number"
            onChange={(e) => handleLandlord(e)}
            error={errors.landlordPhone}
          />
        </div>
      </div>
      <div className={styles.TermsContainer}>
        <InputCheck
          type="checkbox"
          required
          name="isAgentAccepted"
          id="terms"
          value={tenancy.landlordDetails.isAgentAccepted}
          placeholder="Accept our terms and conditions"
          onChange={(e) => handleLandlord(e)}
          error={errors.isAgentAccepted}
        />
        <p>
          By submitting this form, you understand and accept that we use your
          information in accordance with our{" "}
          <a
            href="https://rimbo.rent/en/privacy-policy/"
            target="_blank"
            rel="noreferrer"
            className="link-tag"
          >
            {" "}
            privacy policy
          </a>{" "}
          and{" "}
          <a
            href="https://rimbo.rent/en/cookies-policy/"
            target="_blank"
            rel="noreferrer"
            className="link-tag"
          >
            {" "}
            cookies policy
          </a>
          .
        </p>
      </div>

      <div className={styles.ButtonContainer}>
        <Button onClick={() => setStep(step - 1)} type="button">
          Previous Step
        </Button>

        {isProcessing ? (
          <Loader
            type="Puff"
            color="#01d2cc"
            height={50}
            width={50}
            timeout={3000} //3 secs
          />
        ) : (
          <Button disabled={isProcessing} type="submit">
            Submit
          </Button>
        )}
      </div>
    </form>
  );
};

LandlorDetails.propTypes = {
  step: PropTypes.number,
  setStep: PropTypes.func,
  tenancy: PropTypes.object,
  setTenancy: PropTypes.func,
};

export default LandlorDetails;
