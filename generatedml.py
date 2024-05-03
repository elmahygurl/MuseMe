import csv

def generate_insert_sql(csv_file):
    with open(csv_file, 'r', encoding='utf-8') as file:
        reader = csv.DictReader(file)
        insert_sql = []
        for row in reader:
            museum_id = row['locationID']
            name = row['museum name']
            location = row['Location']
            governate = row['governate']
            museum_type = row['museum type']
            description = row['Text description']
            days_off = row['Days off']
            opening_hours = row['Opening hours']
            ticket_price = row['Ticket price']

            # Escape single quotes in description
            description = description.replace("'", "''")

            # Convert empty strings to NULL
            if not governate:
                governate = 'NULL'
            else:
                governate = f"'{governate}'"
            if not days_off:
                days_off = 'NULL'
            else:
                days_off = f"'{days_off}'"
            if not opening_hours:
                opening_hours = 'NULL'
            else:
                opening_hours = f"'{opening_hours}'"
            if not ticket_price:
                ticket_price = 'NULL'
            else:
                ticket_price = float(ticket_price)

            # Generate SQL INSERT statement
            insert_statement = f"INSERT INTO Museum (museumID, name, location, governate, museumType, description, daysOff, openingHours, ticketPrice) VALUES ({museum_id}, '{name}', '{location}', {governate}, '{museum_type}', '{description}', {days_off}, {opening_hours}, {ticket_price});"
            insert_sql.append(insert_statement)
        
        return insert_sql

def write_sql_to_file(sql_statements, output_file):
    with open(output_file, 'w', encoding='utf-8') as file:
        for statement in sql_statements:
            file.write(statement + '\n')

if __name__ == "__main__":
    csv_file = 'museme-sheet.csv'  # Replace with the path to your CSV file
    output_file = 'museum_insert.sql'  # Replace with the desired output file name
    
    insert_sql = generate_insert_sql(csv_file)
    write_sql_to_file(insert_sql, output_file)
    print(f"SQL insert statements written to {output_file}")
