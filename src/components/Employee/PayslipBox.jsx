import React from 'react';
import { Document, Page, Text, View, PDFDownloadLink } from '@react-pdf/renderer';

// Payslip PDF Document Component
const PayslipDocument = React.memo(({ paidDays, date, salary, time }) => (
    <Document>
        <Page size="A4" style={{ padding: 20 }}>
            <Text style={{ fontSize: 20, textAlign: 'center', marginBottom: 20 }}>Payslip</Text>
            <View style={{ marginBottom: 10 }}>
                <Text><strong>Paid Days:</strong> {paidDays}</Text>
                <Text><strong>Date:</strong> {date}</Text>
                <Text><strong>Time:</strong> {time}</Text> {/* Wrapped in <Text> */}
                <Text><strong>Salary:</strong> ${salary.toFixed(2)}</Text>
            </View>
        </Page>
    </Document>
));

// Payslip Box Component without color-specific styling
const PayslipBox = ({ paidDays, date, time, salary }) => {
    // Memoize the link to avoid unnecessary renders
    const payslipDocument = <PayslipDocument paidDays={paidDays} date={date} salary={salary} time={time} />;

    return (
        <div className="rounded-lg shadow-lg p-6 mb-6"> {/* Removed background color */}
            <div className="space-y-2 mb-4">
                <p><strong>Paid Days:</strong> <span className="font-semibold">{paidDays}</span></p>
                <p><strong>Date:</strong> <span className="font-semibold">{date}</span></p>
                {/* Time is not shown in the UI */}
                <p><strong>Salary:</strong> <span className="font-semibold">${salary.toFixed(2)}</span></p>
            </div>
            {/* Download Payslip Button */}
            <PDFDownloadLink
                document={payslipDocument}
                fileName={`payslip_${date}.pdf`}
                className="mt-4 inline-block py-2 px-4 rounded" // Removed color-specific classes
            >
                {({ blob, url, loading, error }) =>
                    loading ? 'Loading document...' : 'Download Payslip'
                }
            </PDFDownloadLink>
        </div>
    );
};

export default PayslipBox;
