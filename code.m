while true
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
        'SPT100', 'Hall Thruster', 17, 83, 1600, 2.9;
        'ROS 2000', 'Hall Thruster', 19, [71 132], [1600 1700], 2.9;
        'HT100', 'Hall Thruster', 20, [2 12], [900 1600], 0.05;
        'HT400', 'Hall Thruster', 20, [19 25], [1000 1450], 0.2;
        'XHT 5000', 'Hall Thruster', 22, 230, NaN, NaN; % Estimated
        'HEMPT 3050', 'Hall Thruster', [20 35], [10 70], [2000 3500], 4;
        'HEMPT 30250', 'Hall Thruster', [20 35], [30 330], [2000 3500], 20;
        'PPS 5000', 'Hall Thruster', [15 20], [230 325], [2300 1750], 15;
        'CHEAP', 'Hall Thruster', 17, 15, 1400, 0.2;
        'PPSNG', 'Hall Thruster', 18, 140, 1900, 5;
    };

    % Display available categories
    disp('Available Categories of Electric Propulsion Systems:');
    disp('- Ion Thrusters');
    disp('- Hall Effect Thrusters');

    % User selects a category
    categoryChoice = input('Enter the category you are interested in (Ion Thrusters / Hall Effect Thrusters): ', 's');

    % Validate category selection
    if strcmpi(categoryChoice, 'Ion Thrusters')
        selectedCategory = 'Ion Thruster';
    elseif strcmpi(categoryChoice, 'Hall Effect Thrusters')
        selectedCategory = 'Hall Thruster';
    else
        disp('Invalid category. Please restart and choose a valid category.');
        continue;
    end

    % Display systems in the selected category
    disp(['Available ', selectedCategory, ' Systems:']);
    for i = 1:size(EPSystems, 1)
        if strcmpi(EPSystems{i, 2}, selectedCategory)
            fprintf('-%s\n', EPSystems{i, 1});
        end
    end

    % User selects a system
    userChoice = input('Enter the name of the propulsion system you are interested in: ', 's');

    % Find the system in the database
    idx = find(strcmpi(userChoice, EPSystems(:, 1)));
    if isempty(idx)
        disp('System not found. Please try again.');
        continue; 
    end

    % Display details of the selected system
    selectedSystem = EPSystems(idx, :);
    disp('Details of the selected system:');
    fprintf('Name: %s\n', selectedSystem{1});
    fprintf('Type: %s\n', selectedSystem{2});
    fprintf('Power-To-Thrust Ratio (W/mN): %s\n', num2str(selectedSystem{3}));
    fprintf('Thrust (mN): %s\n', mat2str(selectedSystem{4}));
    fprintf('Specific Impulse (ISP) (s): %s\n', mat2str(selectedSystem{5}));
    fprintf('Total Impulse (MNs): %s\n', num2str(selectedSystem{6}));

    % Check if the user wants to compare
    compareChoice = input('Do you want to compare this system with another? (yes/no): ', 's');
    if strcmpi(compareChoice, 'yes')
        % Display available systems for comparison
        disp('Available systems for comparison:');
        for i = 1:size(EPSystems, 1)
            fprintf('-%s\n', EPSystems{i, 1});
        end

        % User selects a system for comparison
        compareWith = input('Enter the name of the system to compare with: ', 's');

        % Find the comparison system
        compIdx = find(strcmpi(compareWith, EPSystems(:, 1)));
        if isempty(compIdx)
            disp('Comparison system not found. Please try again.');
            continue;
        end

        compareSystem = EPSystems(compIdx, :);

        % Extract numerical parameters for comparison
        params = {'Power-To-Thrust Ratio (W/mN)', 'Thrust (mN)', 'Specific Impulse (ISP) (s)', 'Total Impulse (MNs)'};
        selectedValues = [selectedSystem{3}, mean(selectedSystem{4}), mean(selectedSystem{5}), selectedSystem{6}];
        compareValues = [compareSystem{3}, mean(compareSystem{4}), mean(compareSystem{5}), compareSystem{6}];

        % Calculate percentage differences
        differences = 100 * (selectedValues - compareValues) ./ compareValues;

        % Display percentage differences
        disp('Comparison Results:');
        betterCount = 0; % Track which system is better overall
        for i = 1:length(params)
            if ~isnan(differences(i))
                if differences(i) > 0
                    fprintf('%s: %s is %.2f%% better than %s.\n', params{i}, selectedSystem{1}, differences(i), compareSystem{1});
                    betterCount = betterCount + 1;
                else
                    fprintf('%s: %s is %.2f%% worse than %s.\n', params{i}, selectedSystem{1}, abs(differences(i)), compareSystem{1});
                end
            else
                fprintf('%s: Not available for comparison.\n', params{i});
            end
        end

        % Determine overall better system
        if betterCount >= 2
            fprintf('\nOverall, %s is more suitable for deep space missions based on the majority of metrics.\n', selectedSystem{1});
        else
            fprintf('\nOverall, %s is more suitable for deep space missions based on the majority of metrics.\n', compareSystem{1});
        end

        % Plot separate graphs for each metric
        for i = 1:length(params)
            if ~isnan(selectedValues(i)) && ~isnan(compareValues(i))
                figure;
                bar([selectedValues(i), compareValues(i)]);
                set(gca, 'xticklabel', {selectedSystem{1}, compareSystem{1}});
                ylabel(params{i});
                title(['Comparison of ', params{i}]);
                grid on;
            end
        end
    end

    % Check if the user wants to restart
    restartChoice = input('Do you want to start over again? (yes/no): ', 's');
    if strcmpi(restartChoice, 'no')
        disp('Exiting the program. Thank you!');
        break;
    end
end
