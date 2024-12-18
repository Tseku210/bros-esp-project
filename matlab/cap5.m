clc;
clear all;
close all;

% Constants
g0 = 9.80665; % Gravitational acceleration (m/s^2)

% Define spacecraft database (Currently only Dawn)
spacecraftDatabase = {
    'Dawn', 747.1, 1217.7; % Name, Dry mass (kg), Launch mass (kg)
};

% Define planet database (Currently only Mars)
planetDatabase = {
    'Mars', 77248512 * 1000; % Name, Distance from Mars is in an orbit about miles of our orbit in meters
};

% Define the Electric Propulsion Systems database
EPSystems = {
    'UK-10', 'Ion Thruster', 30, 25, 3000, 1;
    'RITuX', 'Ion Thruster', [30 100], [0.05 0.5], [300 3000], 0.025;
    'RIT10', 'Ion Thruster', 30, 15, 3300, 1.5;
    'RIT22', 'Ion Thruster', 35, [50 200], 4200, 20;
    'MiDGIT S', 'Ion Thruster', 40, [0.001 1], 1500, 0.04;
    'T5', 'Ion Thruster', 30, [0.6 20], [500 3000], 1.5;
    'T6', 'Ion Thruster', 35, 150, 4400, 20;
    'DS4G', 'Ion Thruster', [70 90], [2 5], 14000, NaN; % Estimated
    'PPS 1350', 'Hall Thruster', 17, [50 88], 1650, 3;
    'PPSNG', 'Hall Thruster', 18, 140, 1900, 5;
    'PPS 5000', 'Hall Thruster', [15 20], [230 325], [2300 1750], 15;
};

% Ask the user to choose a spacecraft
disp('Available Spacecraft:');
for i = 1:size(spacecraftDatabase, 1)
    fprintf('%d. %s (Dry Mass: %.1f kg, Launch Mass: %.1f kg)\n', ...
        i, spacecraftDatabase{i, 1}, spacecraftDatabase{i, 2}, spacecraftDatabase{i, 3});
end
spacecraftChoice = input('Choose a spacecraft by number: ');

% Validate spacecraft choice
if spacecraftChoice < 1 || spacecraftChoice > size(spacecraftDatabase, 1)
    error('Invalid choice. Please restart the program and select a valid spacecraft.');
end

% Extract chosen spacecraft parameters
spacecraftName = spacecraftDatabase{spacecraftChoice, 1};
dryMass = spacecraftDatabase{spacecraftChoice, 2};
launchMass = spacecraftDatabase{spacecraftChoice, 3};
propellantMass = launchMass - dryMass;

fprintf('You selected: %s (Dry Mass: %.1f kg, Launch Mass: %.1f kg)\n', ...
    spacecraftName, dryMass, launchMass);

% Ask the user to choose a planet
disp('Available Planets:');
for i = 1:size(planetDatabase, 1)
    fprintf('%d. %s (Distance from Earth: %.2f million kilometers)\n', ...
        i, planetDatabase{i, 1}, planetDatabase{i, 2} / 1e9);
end
planetChoice = input('Choose a planet by number: ');

% Validate planet choice
if planetChoice < 1 || planetChoice > size(planetDatabase, 1)
    error('Invalid choice. Please restart the program and select a valid planet.');
end

% Extract chosen planet parameters
planetName = planetDatabase{planetChoice, 1};
distanceToPlanet = planetDatabase{planetChoice, 2};

fprintf('You selected: %s (Distance from Earth: %.2f million kilometers)\n', ...
    planetName, distanceToPlanet / 1e9);

% Ask the user to choose a propulsion system
disp('Available Electric Propulsion Systems:');
for i = 1:size(EPSystems, 1)
    fprintf('%d. %s (%s)\n', i, EPSystems{i, 1}, EPSystems{i, 2});
end
thrusterChoice = input('Choose a propulsion system by number: ');

% Validate thruster choice
if thrusterChoice < 1 || thrusterChoice > size(EPSystems, 1)
    error('Invalid choice. Please restart the program and select a valid propulsion system.');
end

% Extract chosen thruster parameters
thruster = EPSystems(thrusterChoice, :);
thrusterName = thruster{1};
thrusterType = thruster{2};
thrust = mean(thruster{4}, 'omitnan') / 1000; % Convert mN to N
ISP = mean(thruster{5}, 'omitnan'); % Specific impulse (s)

if isnan(ISP) || isnan(thrust)
    error('%s (%s): Missing parameters for calculation. Please choose another thruster.', thrusterName, thrusterType);
end

fprintf('You selected: %s (%s)\n', thrusterName, thrusterType);

% Calculate exhaust velocity (m/s)
exhaustVelocity = ISP * g0;

% Calculate delta-v using Tsiolkovsky rocket equation
deltaV = exhaustVelocity * log(launchMass / dryMass);

% Calculate thrust duration directly
propellantConsumed = launchMass - dryMass; % Total propellant consumed
thrustDuration = propellantConsumed / (thrust / exhaustVelocity); % Burn time (s)
thrustDurationDays = thrustDuration / (24 * 3600); % Convert to days

% Calculate coasting time
coastingTime = distanceToPlanet / deltaV; % Time in seconds
coastingTimeDays = coastingTime / (24 * 3600); % Convert to days

% Total travel time
totalTravelTimeDays = thrustDurationDays + coastingTimeDays;

% Display results
fprintf('\nMission Summary:\n');
fprintf(' - Delta-V: %.2f m/s\n', deltaV);
fprintf(' - Propellant Consumed: %.2f kg\n', propellantConsumed);
fprintf(' - Thrust Duration (Burn Time): %.2f days\n', thrustDurationDays);
fprintf(' - Coasting Time: %.2f days\n', coastingTimeDays);
fprintf(' - Total Travel Time: %.2f days\n', totalTravelTimeDays);
