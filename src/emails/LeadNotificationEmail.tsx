// Node tests render this file with the classic JSX runtime. Next's compiler uses the automatic runtime.
import React from 'react';
import { Body, Container, Heading, Html, Section, Text } from '@react-email/components';

/** Owner copy of one "email my plan" request. Reply-to is the visitor. */
export interface LeadNotificationEmailProps {
  name: string | null;
  email: string;
  company: string | null;
  answers: { label: string; value: string }[];
  topPriorities: string[];
}

export default function LeadNotificationEmail({
  name,
  email,
  company,
  answers,
  topPriorities,
}: LeadNotificationEmailProps) {
  return (
    <Html>
      <Body style={main}>
        <Container style={container}>
          <Heading as="h1" style={h1}>
            New roadmap request
          </Heading>
          <Text style={paragraph}>
            {name ?? 'A visitor'} asked for the full plan. Reply to this email to reach them.
          </Text>
          <Section>
            <Text style={row}>
              <strong>Name:</strong> {name ?? 'Not given'}
            </Text>
            <Text style={row}>
              <strong>Email:</strong> {email}
            </Text>
            <Text style={row}>
              <strong>Business:</strong> {company ?? 'Not given'}
            </Text>
          </Section>
          <Heading as="h2" style={h2}>
            Their answers
          </Heading>
          <Section>
            {answers.map((item) => (
              <Text key={item.label} style={row}>
                <strong>{item.label}:</strong> {item.value}
              </Text>
            ))}
          </Section>
          <Heading as="h2" style={h2}>
            Top 3 priorities in their plan
          </Heading>
          <Section>
            {topPriorities.map((title, i) => (
              <Text key={title} style={row}>
                {i + 1}. {title}
              </Text>
            ))}
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const main = { backgroundColor: '#EEEDEB', fontFamily: 'Inter, Arial, sans-serif', color: '#1C1717' };
const container = { maxWidth: '560px', margin: '0 auto', padding: '24px', backgroundColor: '#FFFFFF' };
const h1 = { fontSize: '22px', margin: '0 0 12px', color: '#990000' };
const h2 = { fontSize: '16px', margin: '20px 0 8px', color: '#1C1717' };
const paragraph = { fontSize: '15px', lineHeight: '22px', margin: '0 0 12px' };
const row = { fontSize: '14px', lineHeight: '20px', margin: '0 0 6px' };
