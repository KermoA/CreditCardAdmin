export interface CreditCard {
    id: number;
    cardName: string;
    description: string;
    bankName: string;
    maxCredit: number;
    interestRate: number;
    active: boolean;
    recommendedScore: string;
    annualFee: number;
    termsAndConditions: string;
    createdDate: string;
    updateDate: string;
}
